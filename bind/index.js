const person = {
  name: 'Богдан'
}

function info(phone, email) {
  console.log(`Имя: ${this.name}, Тел.: ${phone}, Email: ${email}`)
}


// Demo
// info.bind(person)('12345', 'b@mail.ru')
// info.bind(person, '12345')('b@mail.ru')
// info.bind(person, '12345', 'b@mail.ru')()

// 1 Простой
// function bind(fn, context, ...rest) {
//   return fn.bind(context, ...rest)
// }

// 2 Без встроенных методов 

// function bind(fn, context, ...rest) {
//   return function(...args) {
//     const uniqId = Date.now().toString()

//     context[uniqId] = fn

//     const result = context[uniqId](...rest.concat(args))

//     delete context[uniqId]

//     return result
//   }
// }

// 3 ES5

// function bind(fn, context) {
//   const rest = Array.prototype.slice.call(arguments, 2)
//   return function() {
//     const args = Array.prototype.slice.call(arguments)
//     return fn.apply(context, rest.concat(args))
//   }
// }

// 4 ES6

function bind(fn, context, ...rest) {
  return function(...args) {
    // return fn.apply(context, rest.concat(args))
    return fn.call(context, ...rest.concat(args))
  }
}

bind(info, person)('12345', 'b@mail.ru')
bind(info, person, '12345')('b@mail.ru')
bind(info, person, '12345', 'b@mail.ru')()


// Call
function call(fn, context, ...args) {
  const uniqId = Date.now().toString()

  context[uniqId] = fn

  const result = context[uniqId](...args)

  delete context[uniqId]

  return result
}

call(info, person, '1234', 'c@mail.ru')

// Apply
function apply(fn, context, args) {
  const uniqId = Date.now().toString()

  context[uniqId] = fn

  const result = context[uniqId](...args)

  delete context[uniqId]

  return result
}

apply(info, person, ['1234', 'c@mail.ru'])
