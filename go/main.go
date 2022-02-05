package main

import (
	"crud/example/controller"
	"fmt"
	"net/http"
)

func main(){
	http.HandleFunc("/", controller.IndexProductHandler)
	http.HandleFunc("/create", controller.CreateProductHandler)

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("assets"))))

	fmt.Println("Server is running on port 8000")
	http.ListenAndServe(":8000", nil)
}