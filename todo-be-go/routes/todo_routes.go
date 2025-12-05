package routes

import (
	"github.com/chander3121/todo-be-go/controllers"

	"github.com/gin-gonic/gin"
)

func BlogRoutes(r *gin.Engine) {
	r.POST("/todos", controllers.CreateTodo)
	r.GET("/todos", controllers.GetTodos)
	r.GET("/todos/:id", controllers.GetTodo)
	r.PUT("/todos/:id", controllers.UpdateTodo)
	r.DELETE("/todos/:id", controllers.DeleteTodo)
}
