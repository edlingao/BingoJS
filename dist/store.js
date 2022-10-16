export default function Store(store) {
  return new Proxy(store, {
    get(target, property, reciver) {
      console.log(property, target[property], reciver)
      return target[property];
    },
    set(target, property, newValue, reciver) {
      target[property] = newValue;
      return target[property];
    }
  })
}