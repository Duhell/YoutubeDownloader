import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3000
import { frontend } from './Frontend/browser.js'


// set up
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// routes
app.get('/',(request,respond)=>{
    let data = {
        isSuccess: false,
        errorMessage: `<p class="text-sm text-center">example: https://www.youtube.com/watch?v=<strong>mT_gLPENqvA</strong></p>`,
        videoTitle: null,
        videoThumbnail: null,
        videoLength:null,
        videoFormats:[]
    }
    respond.send(frontend(data.isSuccess,data.videoTitle,data.videoLength,data.videoThumbnail,data.videoFormats,data.errorMessage))})
app.post('/',async (request,respond)=>{
    const youtubeVideoId = request.body.youtubeID
    if(youtubeVideoId === undefined || youtubeVideoId === null || youtubeVideoId === ""){
        let data = {
            isSuccess: false,
            errorMessage: `<p class="text-red-800 text-center text-sm font-medium">Insert a Youtube Video Id</p>`,
            videoTitle: null,
            videoThumbnail: null,
            videoLength:null,
            videoFormats:[]
        }
        respond.send(frontend(data.isSuccess,data.videoTitle,data.videoLength,data.videoThumbnail,data.videoFormats,data.errorMessage))
    }else{
        
        const parameters = {
            "method": 'GET',
            "url": `https://ytstream-download-youtube-videos.p.rapidapi.com/dl`,
            "params": {id: youtubeVideoId},
            "headers": {
                "X-RapidAPI-Key": process.env.API_KEY,
                "X-RapidAPI-Host": process.env.API_HOST
            }
        }
        axios.request(parameters).then(function (response) {
            let data = {
                isSuccess: true,
                errorMessage: null,
                videoTitle: response.data.title,
                videoThumbnail: response.data.thumbnail[1].url,
                videoLength:response.data.lengthSeconds / 60,
                videoFormats: response.data.formats
            }
            respond.send(frontend(data.isSuccess,data.videoTitle,data.videoLength,data.videoThumbnail,data.videoFormats,data.errorMessage))
            console.log(response.data.formats[0].qualityLabel)
        }).catch(function (error) {
            console.error(error);
        });
    }
})


// listen
app.listen(PORT,()=> console.log(`Server Running on port ${PORT}`))