"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exportnow = {
    path: '/json-api',
    handler: (req, res) => {
        res.set('Content-Type', 'application/json').end(JSON.stringify({
            "openapi": "3.0.0",
            "info": {
                "title": "Minify api",
                "description": "minify api by ridhesh w, cybe.",
                "contact": {
                    "url": "https://www.twitter.com/@cybetwt"
                },
                "license": {
                    "name": "Apache 2.0",
                    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
                },
                "version": "1.0.0"
            },
            "servers": [
                {
                    "url": "https://minify.cybemachine.repl.co",
                    "description": "repl"
                },
                {
                    "url": "https://web-minify.vercel.app",
                    "description": "vercel server 1"
                }
            ],
            "paths": {
                "/api": {
                    "get": {
                        "tags": [
                            "js"
                        ],
                        "summary": "minify",
                        "description": "By passing in the appropriate options, you can minify js text\n",
                        "operationId": "getjs",
                        "parameters": [
                            {
                                "name": "code",
                                "in": "query",
                                "description": "raw js code",
                                "required": true,
                                "style": "form",
                                "explode": true,
                                "schema": {
                                    "type": "string"
                                }
                            }
                        ],
                        "responses": {
                            "200": {
                                "description": "minified content",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/response"
                                            }
                                        }
                                    }
                                }
                            },
                            "400": {
                                "description": "no input/code detected"
                            }
                        }
                    },
                    "post": {
                        "tags": [
                            "js"
                        ],
                        "summary": "minify",
                        "description": "By passing in the appropriate options, you can minify js text\n",
                        "operationId": "postjs",
                        "requestBody": {
                            "content": {
                                "application/json": {
                                    "example": {
                                        "code": "console.log(1 + 1)"
                                    }
                                }
                            }
                        },
                        "responses": {
                            "200": {
                                "description": "minified content",
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/components/schemas/response"
                                            }
                                        }
                                    }
                                }
                            },
                            "400": {
                                "description": "no body detected"
                            }
                        }
                    }
                }
            },
            "components": {
                "schemas": {
                    "response": {
                        "maxProperties": 1,
                        "minProperties": 1,
                        "type": "object",
                        "properties": {
                            "code": {
                                "type": "string",
                                "format": "text",
                                "example": "const hi=!0;console.log(hi);"
                            },
                            "error": {
                                "type": "object",
                                "example": {
                                    "message": "Unexpected token: name «hi», expected: punc «;»",
                                    "filename": "0",
                                    "line": 1,
                                    "col": 5,
                                    "pos": 5
                                }
                            }
                        }
                    }
                }
            }
        }));
    }
};
exports.default = exportnow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wYWNrYWdlcy9zZXJ2ZXIvcm91dGVzL2pzb24tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxTQUFTLEdBQUc7SUFDZCxJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7UUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMzRCxTQUFTLEVBQUUsT0FBTztZQUNsQixNQUFNLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLGFBQWEsRUFBRSxnQ0FBZ0M7Z0JBQy9DLFNBQVMsRUFBRTtvQkFDUCxLQUFLLEVBQUUsa0NBQWtDO2lCQUM1QztnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFlBQVk7b0JBQ3BCLEtBQUssRUFBRSxpREFBaUQ7aUJBQzNEO2dCQUNELFNBQVMsRUFBRSxPQUFPO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQO29CQUNJLEtBQUssRUFBRSxvQ0FBb0M7b0JBQzNDLGFBQWEsRUFBRSxNQUFNO2lCQUN4QjtnQkFDRDtvQkFDSSxLQUFLLEVBQUUsK0JBQStCO29CQUN0QyxhQUFhLEVBQUUsaUJBQWlCO2lCQUNuQzthQUNKO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLE1BQU0sRUFBRTtvQkFDSixLQUFLLEVBQUU7d0JBQ0gsTUFBTSxFQUFFOzRCQUNKLElBQUk7eUJBQ1A7d0JBQ0QsU0FBUyxFQUFFLFFBQVE7d0JBQ25CLGFBQWEsRUFBRSxpRUFBaUU7d0JBQ2hGLGFBQWEsRUFBRSxPQUFPO3dCQUN0QixZQUFZLEVBQUU7NEJBQ1Y7Z0NBQ0ksTUFBTSxFQUFFLE1BQU07Z0NBQ2QsSUFBSSxFQUFFLE9BQU87Z0NBQ2IsYUFBYSxFQUFFLGFBQWE7Z0NBQzVCLFVBQVUsRUFBRSxJQUFJO2dDQUNoQixPQUFPLEVBQUUsTUFBTTtnQ0FDZixTQUFTLEVBQUUsSUFBSTtnQ0FDZixRQUFRLEVBQUU7b0NBQ04sTUFBTSxFQUFFLFFBQVE7aUNBQ25COzZCQUNKO3lCQUNKO3dCQUNELFdBQVcsRUFBRTs0QkFDVCxLQUFLLEVBQUU7Z0NBQ0gsYUFBYSxFQUFFLGtCQUFrQjtnQ0FDakMsU0FBUyxFQUFFO29DQUNQLGtCQUFrQixFQUFFO3dDQUNoQixRQUFRLEVBQUU7NENBQ04sTUFBTSxFQUFFLE9BQU87NENBQ2YsT0FBTyxFQUFFO2dEQUNMLE1BQU0sRUFBRSwrQkFBK0I7NkNBQzFDO3lDQUNKO3FDQUNKO2lDQUNKOzZCQUNKOzRCQUNELEtBQUssRUFBRTtnQ0FDSCxhQUFhLEVBQUUsd0JBQXdCOzZCQUMxQzt5QkFDSjtxQkFDSjtvQkFDRCxNQUFNLEVBQUU7d0JBQ0osTUFBTSxFQUFFOzRCQUNKLElBQUk7eUJBQ1A7d0JBQ0QsU0FBUyxFQUFFLFFBQVE7d0JBQ25CLGFBQWEsRUFBRSxpRUFBaUU7d0JBQ2hGLGFBQWEsRUFBRSxRQUFRO3dCQUN2QixhQUFhLEVBQUU7NEJBQ1gsU0FBUyxFQUFFO2dDQUNQLGtCQUFrQixFQUFFO29DQUNoQixTQUFTLEVBQUU7d0NBQ1AsTUFBTSxFQUFFLG9CQUFvQjtxQ0FDL0I7aUNBQ0o7NkJBQ0o7eUJBQ0o7d0JBQ0QsV0FBVyxFQUFFOzRCQUNULEtBQUssRUFBRTtnQ0FDSCxhQUFhLEVBQUUsa0JBQWtCO2dDQUNqQyxTQUFTLEVBQUU7b0NBQ1Asa0JBQWtCLEVBQUU7d0NBQ2hCLFFBQVEsRUFBRTs0Q0FDTixNQUFNLEVBQUUsT0FBTzs0Q0FDZixPQUFPLEVBQUU7Z0RBQ0wsTUFBTSxFQUFFLCtCQUErQjs2Q0FDMUM7eUNBQ0o7cUNBQ0o7aUNBQ0o7NkJBQ0o7NEJBQ0QsS0FBSyxFQUFFO2dDQUNILGFBQWEsRUFBRSxrQkFBa0I7NkJBQ3BDO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFO29CQUNQLFVBQVUsRUFBRTt3QkFDUixlQUFlLEVBQUUsQ0FBQzt3QkFDbEIsZUFBZSxFQUFFLENBQUM7d0JBQ2xCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixZQUFZLEVBQUU7NEJBQ1YsTUFBTSxFQUFFO2dDQUNKLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixRQUFRLEVBQUUsTUFBTTtnQ0FDaEIsU0FBUyxFQUFFLDhCQUE4Qjs2QkFDNUM7NEJBQ0QsT0FBTyxFQUFFO2dDQUNMLE1BQU0sRUFBRSxRQUFRO2dDQUNoQixTQUFTLEVBQUU7b0NBQ1AsU0FBUyxFQUFFLGlEQUFpRDtvQ0FDNUQsVUFBVSxFQUFFLEdBQUc7b0NBQ2YsTUFBTSxFQUFFLENBQUM7b0NBQ1QsS0FBSyxFQUFFLENBQUM7b0NBQ1IsS0FBSyxFQUFFLENBQUM7aUNBQ1g7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKLENBQUMsQ0FBQyxDQUFBO0lBRVAsQ0FBQztDQUNKLENBQUE7QUFFRCxrQkFBZSxTQUFTLENBQUMifQ==