import dotenv from "dotenv"
dotenv.config();

const targets = [
    {
        name: "group1",
        link: process.env.GROUP_URL_1,
        interval: 1,
        text: process.env.GROUP_TEXT_1,
        files: ["1.jpg", "2.jpg"]
    },
    {
        name: "group2", 
        link: process.env.GROUP_URL_2,
        interval: 1, 
        text: process.env.GROUP_TEXT_2,
        files: []
    }
]
export default targets;