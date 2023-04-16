export function frontend(isSuccess,title,length,thumbnail,formats,msg){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Youtube Download</title>
    </head>
    <body class="bg-slate-900 h-screen w-full flex justify-center items-center">
        <div class="bg-slate-200 min-w-min min-h-min p-4 rounded">
            <p class="text-center mb-5 font-medium text-lg">Youtube Downloader</p>
            <form action="/" method="POST" class="flex justify-center w-full mb-5 gap-3">
                <input placeholder="Paste Youtube Video ID"  type="text" name="youtubeID" class="border border-orange-500 outline-none p-2 rounded font-medium">
                <button class="py-2 px-5 text-white bg-sky-950 rounded font-medium">Send</button>
            </form>
            ${(()=>{
                if(!isSuccess){
                    return `${msg}`
                }else{
                    let formatList = formats
                    let list = `${formatList.map(format=>`<a href="${format.url}"><button class="bg-green-400 py-2 px-5 font-medium rounded">${format.qualityLabel}</button></a>`)}`
                    return `
                    <div>
                        <p class="font-medium text-base mb-1">${title}</p>
                        <p class="font-medium text-base mb-3">Length: ${length.toFixed(2)} minutes</p>
                        <div class="min-w-min min-h-min mb-4">
                            <img class="rounded w-full h-full" src="${thumbnail}" alt="${title}">
                        </div>
                        <div class="flex justify-center items-center gap-x-3">
                            ${list}
                        </div>
                    </div>
                    `
                }
            })()}
            
        </div>
    </body>
    </html>

    `
}