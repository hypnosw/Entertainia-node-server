export default function Entertainia(app){
    app.get('/hello', (req, res)=>{
        res.send("Welcome to Entertainia, this message greets you just for you");
    })
}