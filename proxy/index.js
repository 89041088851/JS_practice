// Wrapper
const withDefaultValue = (target, defaultValue = 0) => {
  return new Proxy(target, {
    get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
  })
}

const position = withDefaultValue({
    x: 24,
    y: 42
  },
  0
)

// Hidden properties
const withHiddenProps = (target, prefix = '_') => {
  return new Proxy(target, {
    has: (obj, prop) => (prop in obj) && (!prop.startsWith(prefix))
      // ownKeys: obj => Reflect.ownKeys(obj)
      .filter(p => !p.startsWith(prefix)),
    get: (obj, prop, recevier) => (prop in recevier) ? obj[prop] : void 0
  })
}

const data = withHiddenProps({
  name: 'Igor',
  age: 25,
  _uid: '123123'
})

// Optimization

const IndexedArray = new Proxy(Array, {
  construct(target, [args]) {
    const index = {}
    args.forEach(item => (index[item.id] = item))

    return new Proxy(new target(...args), {
      get(arr, prop) {
        switch (prop) {
          case 'push':
            return item => {
              index[item.id] = item
              arr[prop].call(arr, item)
          }
          case 'fiendById':
            return id => index[id]
          default:
            return arr[prop]
        }
      }
    })
  }
})

const users = new IndexedArray([{
    id: 1,
    name: 'Igor',
    job: 'Fullstack',
    age: 25
  },
  {
    id: 2,
    name: 'Elena',
    job: 'Student',
    age: 22
  },
  {
    id: 3,
    name: 'Victor',
    job: 'Backend',
    age: 23
  },
  {
    id: 4,
    name: 'Vasilisa',
    job: 'Teacher',
    age: 24
  }
])