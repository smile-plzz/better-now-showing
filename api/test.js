export default function handler(req, res) {
    res.status(200).json({ 
        message: 'Server is working!', 
        timestamp: new Date().toISOString(),
        status: 'ok'
    });
}
