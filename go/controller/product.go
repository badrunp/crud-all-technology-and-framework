package controller

import (
	"crud/example/models"
	"crud/example/types"
	"fmt"
	"html/template"
	"net/http"
	"path"
	"strconv"
	"time"
)

func IndexProductHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" && r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	tmpl := template.Must(template.ParseFiles(path.Join("views", "index.html"), path.Join("views", "layout.html")))

	if err := tmpl.Execute(w, models.Data); err != nil {
		http.Error(w, "Something whent wrong!", http.StatusInternalServerError)
		fmt.Println(err.Error())
		return
	}
}

func CreateProductHandler(w http.ResponseWriter, r *http.Request){
	if r.Method == "GET" {
		tmpl := template.Must(template.ParseFiles(path.Join("views", "create.html"), path.Join("views", "layout.html")))

		if err := tmpl.Execute(w, nil); err != nil {
			http.Error(w, "Something whent wrong!", http.StatusInternalServerError)
			fmt.Println(err.Error())
			return
		}

		return
	}

  if r.Method == "POST" {

    if err := r.ParseForm(); err != nil {
      http.Error(w, "Something whent wrong!", http.StatusInternalServerError)
      fmt.Println(err.Error())
      return
    }

    name := r.FormValue("name")
    price := r.FormValue("price")
    stock := r.FormValue("stock")
    description := r.FormValue("description")

    priceNum, _ := strconv.Atoi(price)
    stockNum, _ := strconv.Atoi(stock)
	  id := strconv.Itoa(int(time.Now().Unix()))

   if priceNum == 0 {
      priceNum = 100
   }

   if stockNum == 0 {
      stockNum = 1
   }

    models.Data = append(models.Data, types.Product{id, name, priceNum, stockNum, description}) 
  }

	http.NotFound(w, r)
}

func DeleteProductHandler(w http.ResponseWriter, r *http.Request){
  if r.Method != "GET"{
    http.NotFound(w, r)
    return
  }

  id := r.URL.Query().Get("id")
  if id == "" {
    http.NotFound(w, r)
    return
  }

  var newProduct = []types.Product{}

  for _, each := range models.Data {
    if each.Id != id {
      newProduct = append(models.Data, types.Product{each.Id, each.Name, each.Price, each.Stock, each.Description}) 
    }
  }

  models.Data = newProduct

  fmt.Println("Delete successfully")
  w.Write([]byte("Delete successfully"))
}
