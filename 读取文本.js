function duqu(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) =>{
            if(err) reject(err);
            resolve(data);
        })
    });
}

duqu('./niuzi.txt').then(value => {
    console.log(value.toString());
},reson => {
    console.log(reson);
})