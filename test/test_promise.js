function test1(){
    console.log("start test 1");
    return new Promise(
        (resolve, reject)=> {
            setTimeout(() => {
                console.log("done test 1");
                resolve();
            }, 1000);
        }
    );
}

function test2(){
    console.log("start test 2");
    return new Promise(
        (resolve, reject)=> {
            setTimeout(() => {
                console.log("done test 2");
                resolve();
            }, 500);
        }
    );
}

function test3(){
    console.log("start test 3");
    return new Promise(
        (resolve, reject)=> {
            setTimeout(() => {
                console.log("done test 3");
                resolve();
            }, 2000);
        }
    );
}
async function run_serial(){
    console.log("start test");
    await test1();
    await test2();
    await test3();
    console.log("All Done.");
}
async function run_parallel(){
    console.log("start test");
    let tests = [test1(),test2(),test3()]
    await Promise.all(tests)
    console.log("All Done.");
}

// run_serial().then(()=> console.log("End")).catch( (e)=> console.error(e));
run_parallel().then(()=> console.log("End")).catch( (e)=> console.error(e));