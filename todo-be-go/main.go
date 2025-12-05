package main

import (
	"github.com/chander3121/todo-be-go/config"
	"github.com/chander3121/todo-be-go/models"
	"github.com/chander3121/todo-be-go/routes"

	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS config
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	config.ConnectDB()
	config.DB.AutoMigrate(&models.Todo{})

	routes.BlogRoutes(r)

	r.Run(":8080")
}
