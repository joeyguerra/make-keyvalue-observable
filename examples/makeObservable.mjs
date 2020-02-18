import tdding from "../tdding.mjs"
import MakeKeyValueObservable from "../src/MakeKeyValueObservable.mjs"
tdding.push("Should call the observer as a function", t => {
    const observable = MakeKeyValueObservable({
        name: "joey g",
        age: 23
    })
    const expected = 24
    observable.observe("age", (key, old, value)=>{
        t.ok(value == expected, `should be ${expected}`)
    })
    observable.age = 24
})

tdding.push("Observer can be an object that responds to `update`", t => {
    const observable = MakeKeyValueObservable({
        name: "joey g",
        age: 23
    })
    const expected = 24
    const observer = {
        update(key, old, value){
            t.ok(value == expected, "Should call update")
        }
    }
    observable.observe("age", observer)
    observable.age = 24
})