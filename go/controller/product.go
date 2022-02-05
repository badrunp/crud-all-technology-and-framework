package controller

import (
	"crud/example/models"
	"fmt"
	"html/template"
	"net/http"
	"path"
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
			http.Error(w, "Something whent wrong", http.StatusInternalServerError)
			fmt.Println(err.Error())
			return
		}

		return
	}

	http.NotFound(w, r)
}