import {renderState} from "~/server/files/render.state";

const indexPageRenderer = ({title}) => {
    const {startBundles, startInline} = renderState

    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta title="${title}">                
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"  />      
        <meta name="description" content="${new Date().toTimeString()}">    
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="alternate icon" href="/favicon.ico" type="image/png" sizes="16x16">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
        <link rel="mask-icon" href="/favicon.svg" color="#FFFFFF">   
        <meta name="theme-color" content="#ffffff">     
        ${startInline.join('\n')}
        ${startBundles.join('\n')}
      </head>
      <body>
        <div id="preloader"></div>
        <div id="app"></div>
      </body>
    </html>`
}

export default indexPageRenderer