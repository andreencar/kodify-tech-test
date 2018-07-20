# Architecture

After reviewing the technical test, I will start by fullfiling the basic requirements and update my application after to do the bonus points.

The test indicates that the server must be as lightweight as possible, which means that it will probably just require two endpoints, one for submitting message, and the other to create a one way connection from the server to the subscribing client. For this last endpoint, I will use SSE as it's the most lightweight and easy way to dispatch messages from my point of view.

After I will start by creating my react app, focusing on the functionality side first and in the end to the styling. Assuming that separation of concerns is necessary and that I will try to have the components "as dumb as possible", I will follow an approach that I usualy do which consists on using Redux and Redux-Thunk and (in this scenario) a MessageService that will be a separate js file which will now how to process the messages and return the correct action to be dispatched by redux-thunk. In this scenario, we might just use the async functionality of the redux-thunk for also submitting the message.

As a side note, the client will be created with create-react-app as it would be a bonus to have webpack functionality and this provides me a fast and easy bootstrap.