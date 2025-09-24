export function getMirrorAdresses() {
    let address = [] as any[]
    const os = require('os')
    const ifaces = os.networkInterfaces();


    for (var dev in ifaces) {
        var iface = ifaces[dev].filter(function(details) {
            // console.log(details.family, details.address)
            return details.family === 'IPv4' || details.family === 4
        });
        if(iface.length > 0) address.push(iface[0].address)
    }

    return address
}


function escapeHtml(unsafeString: string): string {
    // Source: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/6234804#6234804
    const safe = unsafeString
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    return safe
}