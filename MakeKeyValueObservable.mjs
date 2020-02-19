const MakeKeyValueObservable = obj=>{
    const observers = {}
    const api = {
        changed(key, old, value){
            if(!observers[key]) return
            observers[key].forEach(o=>{
                o.observer.update ? o.observer.update(key, old, value) : o.observer(key, old, value)
            })
        },
        observe(key, observer){
            if(!observers[key]) observers[key] = []
            observers[key].push({key, observer})
        }
    }
    const cached = Object.assign({}, obj)
    const target = {}
    Object.keys(obj).forEach(key=>{
        Reflect.defineProperty(target, key, {
            get(){
                return cached[key]
            },
            set(value){
                const old = cached[key]
                cached[key] = value
                api.changed(key, old, value)
            },
            enumerable: true
        })
    })
    return Object.assign(target, api)
}
export default MakeKeyValueObservable