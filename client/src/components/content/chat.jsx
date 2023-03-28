import React from 'react'
import { GptIcon } from '../../assets'
import './style.scss'

const Chat = () => {
  return (
    <div className='Chat'>
      <div className='qs'>
        <div className='acc'>
          A
        </div>
        <div className='txt'>
          Explain quantum computing in simple terms
        </div>
      </div>

      <div className="res">
        <div className='icon'>
          <GptIcon />
        </div>
        <div className='txt' >
          {"Here is an example of a basic React component that displays a message:\n\n```jsx\nimport React from 'react'\n\nclass Message extends React.Component {\n  render() {\n    return (\n      <div>\n        <h1>Hello, World!</h1>\n        <p>This is a basic React component.</p>\n      </div>\n    )\n  }\n}\n```\n\nIn this example, we are using the `import` statement to include the React library in our code. We are also extending the `React.Component` class to create our own component called `Message`.\n\nThe `render` method is a required function that returns the HTML to be rendered on the page. In this case, we are rendering a `div` element with an `h1` header and a paragraph (`p`) element. These elements will display the message \"Hello, World! This is a basic React component.\"\n\nWe can use this component in other parts of our application by importing it and inserting it into other components or pages.\n\nReact is a powerful library for building user interfaces, allowing developers to build reusable components that can be combined to create complex and dynamic applications."}
        </div>
      </div>
    </div>
  )
}

export default Chat