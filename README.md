# 💡RMGBackEnd

RMGBackEnd is a backend service built with [NestJS](https://nestjs.com/) that dynamically generates JSX code snippets based on natural language descriptions.  
The service integrates with OpenAI's GPT model to interpret prompts and return relevant, ready-to-use code for predefined UI components.

## Features

- Dynamic JSX code generation based on user input.
- Integration with OpenAI's GPT for natural language processing.
- RESTful API endpoint to receive prompts and return a **structured JSON component tree**
- Designed to integrate seamlessly with front-end tools to:
  - Render the UI visually.
  - Copy JSX code.
  - Download the generated code

## Technology Stack

- Node.js (NestJS framework)
- OpenAI API (via `openai` npm package)
- TypeScript
- REST API (Express under the hood)

## Installation

```bash
# Clone the repository
git clone https://https://github.com/RutShabtay/RMGBackEnd
cd RMGBackEnd

# Install dependencies
npm install

# Run in development mode
npm run start:dev
```

## API Endpoint

### `POST /api/generate-mockup`

This endpoint receives a natural language description and returns a **structured JSON component tree**

#### Request Body

```json
{
  "description": "Create a login form with an email field, password field, and a submit button"
}
```

#### Sample Response

```json
{
  "type": "div",
  "props": {
    "className": "flex flex-col items-center p-4"
  },
  "children": [
    {
      "type": "RMGInput",
      "props": {
        "type": "email",
        "placeholder": "Enter your email"
      }
    },
    {
      "type": "RMGInput",
      "props": {
        "type": "password",
        "placeholder": "Enter your password"
      }
    },
    {
      "type": "RMGButton",
      "props": {
        "title": "Submit"
      }
    }
  ]
}
```

## 📘 Example Usage (End-to-End)

1. **User Prompt:**  
   _"Create a user card with profile picture, full name and a follow button."_
2. **Component Tree Returned:**  
   Structured JSON representing the JSX tree (not raw JSX).
3. -**Client-side (RMGFronted)** displays:
   
    -Visual preview of the result.
   
    -Option to copy JSX.
   
    -Option to download code as file.


### 🔐 API Key Security

The OpenAI API key is securely stored in a `.env` file and never exposed in the codebase.  
Environment variables are used to keep credentials safe and out of version control.


## License

This project is licensed under the MIT License.
