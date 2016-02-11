const stampit = require('stampit')

const ModuleExamples = {}

ModuleExamples.Interface = (function () {

  let localStorageSupports = (typeof localStorage !== 'undefined') && localStorage !== null
      ,storage

  let storageInterface = stampit({
    methods: {
      save: function() {
        throw new Error("No save() method implemented")
      }
    }
  })

  let localStorageProvider = stampit()
    .compose(storageInterface)
    .methods({
      save: function saveLocal() {
        localStorage.storage = JSON.stringify(storage)
      }
    })

  let cookieProvider = stampit()
    .compose(storageInterface)
    .methods({
      save: function saveCookie() {
        $.cookie('storage', JSON.stringify(storage))
      }
    })

  let post = stampit({
    methods: {
      save: function save() {
        storage[this.id] = this.data
        storage.save()
        return this
      },
      set: function set(name, value) {
        this.data[name] = value
        return this
      }
    },
    state: {
      data: {
        message: '',
        published: false
      },
      id: undefined
    },
    init: function init() {
      this.id = generateUUID()
      return this
    }
  })

  storage = localStorageSupports ? localStorageProvider() : cookieProvider()

  return post
})()


ModuleExamples.simpleModule = (function() {

  return {
    greet() {return "hello world"}
  }

})()



export default ModuleExamples;