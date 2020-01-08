const diffusion = require("diffusion");
const connection = require("./connection.json");
//import * as diffusion from "../node_modules/diffusion";
//medium.com/jeremy-keeshin/hello-world-for-javascript-with-npm-modules-in-the-browser-6020f82d1072

//https://docs.pushtechnology.com/docs/6.4.0/js/

function start() {
    diffusion
        .connect(connection)
        .then(function(session) {
            // session.topics.add("my-topic", diffusion.topics.TopicType.JSON);
            // let value = { foo: "bar" };
            // let result = session.topicUpdate.set(
            //     "my-topic",
            //     diffusion.datatypes.json(),
            //     value
            // );

            // console.log(result);

            //You can create multiple streams
            session
                .addStream("my-topic", diffusion.datatypes.json())
                .on("value", function(
                    topic,
                    specification,
                    newValue,
                    oldValue
                ) {
                    console.log(
                        `New value for ${topic}: ${newValue.get().foo}`
                    );
                });

            session.select("my-topic");

            let value = { foo: "Sharp" };
            let result = session.topicUpdate.set(
                "my-topic",
                diffusion.datatypes.json(),
                value
            );

            //console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
}

start();
