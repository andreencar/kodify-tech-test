# Changelog

After reviewing the technical test, I will start by fullfiling the basic requirements and update my application after to do the bonus points.

The test indicates that the server must be as lightweight as possible, which means that it will probably just require two endpoints, one for submitting message, and the other to create a one way connection from the server to the subscribing client. For this last endpoint, I will use SSE as it's the most lightweight and easy way to dispatch messages from my point of view.

After I will start by creating my react app, focusing on the functionality side first and in the end to the styling. Assuming that separation of concerns is necessary and that I will try to have the components "as dumb as possible", I will follow an approach that I usualy do which consists on using Redux and Redux-Thunk and (in this scenario) a MessageService that will be a separate js file which will now how to process the messages and return the correct action to be dispatched by redux-thunk. In this scenario, we might just use the async functionality of the redux-thunk for also submitting the message.

As a side note, the client will be created with create-react-app as it would be a bonus to have webpack functionality and this provides me a fast and easy bootstrap.

For the server, a basic ExpressJS application will be used.

For the messages to appear on one or the other side according to being incoming or outgoing messages, messages need to be attached with a user id. Since the requirements clearly indicate most operations must be done on client side, I will generate a userId upon app initialization on client side... But this should not be done in a real world situation.

------

At this point in time, I'm already able to send and receive messages, so now I will start to build the message service that will process commands.


------

Had to do a stop at 18:00 GMT. Will resume as soon as possible

------

Came back, unfortunately I really had to stop. Resuming at 14:45 GMT

------

Added timestamp to message. This is mandatory to be on server side, but for technical test purposes and because the exam said to maintain most logic client side, I will use the client timestamp

Decided to use macbook digital colour meter and images from ios6 message app to identify the correct colors to use on the chat

Finished the basic technical test implementation at 17:13. Will proceed to the bonus points.

------

On the final bonus point which is user typing. I'm thinking about adding a /typing command sent when the user types with some sort of debounce on the client that is typing.

The client that is receiving needs to be able to reset the typing state after x time as well.

------

Ended development. Unhappy about some tight copulation on some places. Fun exam.

Timetable:

20th July
15:00 - 18:00

21th July
14:45 - 20:40 (have dinner)
00:10 - 04:21