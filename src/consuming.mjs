import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get("http://localhost:3000/orders/1")
    .then(({data}) => {
        setText(JSON.stringify(data)); //SetText places it on the results place and then the data is turned into a string
    });
}

export function getCatch() {
    axios.get("http://localhost:3000/orders/123")
    .then(({data}) => {
        setText(JSON.stringify(data)); //SetText places it on the results place and then the data is turned into a string
    })

    .catch(err => setText(err)); // to handle rejected state
}

export function chain() {
    axios.get("http://localhost:3000/orders/123")
    .then(({data}) => {return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })

    .then(({data}) => {
        setText(`City: ${data.city}`)
    });
}

export function chainCatch() {

    axios.get("http://localhost:3000/orders/123")
    .then(({data}) => {return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })

    .then(({data}) => {
        setText(`City: ${data.city}`)
    })
    .catch(err => setText(err));
}

export function final() {
    axios.get("http://localhost:3000/orders/123")
    .then(({data}) => {return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })

    .then(({data}) => {
        setText(`City: ${data.city}`)
    })
    .catch(err => setText(err))
    .finally(() => {
        setTimeout(() => {
            hideWaiting();
        }, 1500)

        appendText("TJX Bootcamp Training. Done");
    })
}