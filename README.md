# AI Chatbot with Next.js and Google's Gemini Pro

A modern, responsive chatbot application built with Next.js and powered by Google's Gemini Pro AI model. The chatbot provides intelligent responses to user queries in real-time.

## Features

- Real-time chat interface
- Powered by Google's Gemini Pro AI model
- Quick response suggestions
- Responsive design
- Markdown support in responses

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.x or later
- A Google AI API key ([Get one here](https://makersuite.google.com/app/apikey))

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
cd my-chatbot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google AI API key:
```env
API_KEY=your_google_ai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the chatbot in action.

## Project Structure

- `/pages` - Contains the main pages and API routes
  - `index.js` - Main chat interface
  - `/api/chat.js` - API endpoint for Gemini Pro integration
- `/styles` - CSS modules and global styles
- `/public` - Static assets

## Development

To start development:

1. Make sure you have set up the `.env` file with your API key
2. Run `npm run dev` to start the development server
3. Make changes to the code - the app will hot-reload

## Building for Production

To create a production build:

```bash
npm run build
npm start
```

## Environment Variables

The following environment variables are required:

- `API_KEY`: Your Google AI API key for Gemini Pro

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

