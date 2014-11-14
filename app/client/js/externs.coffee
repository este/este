###
  App specific externs.

  There are several ways how to prevent compiler from mangling symbols:
  @see http://stackoverflow.com/questions/11681070/exposing-dynamically-created-functions-on-objects-with-closure-compiler

  Expose annotation is brittle. @see http://goo.gl/rOQP2c. Quoting properties
  everywhere is verbose and brittle too.

  PATTERN: Put all app specific properties which should not be mangled here. It
  does not matter exact className, just property name. It will not be mangled
  across whole app.
###

class appTodosTodo
  appTodosTodo::title

class appReactPagesTodosRef
  appReactPagesTodosRef::newTodoInput

class esteReactElement
  esteReactElement::touchAction
