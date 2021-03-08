// let todo: string = "Clean dishes";
let myName: string = "Emirhan";

var todo = {
    id: 123,
    title: "Clean dishes",
    completed: false
}

var { completed, id, title } = todo;

var animal = {
    name: "Fido",
    species: "Dog",
    age: 5,
    speak: function() {
        console.log("woof!");
    }
}

function makeTheAnimalSpeak(animal) {
    animal.speak();
}

// function totalLength(x: any[], y: string): number {
//     var total: number = x.length + y.length;
//     return total;
// }

// Function Overloads
// function totalLength(...args: [x: string, y: string] | [x: any[], y: any[]]): number {
//     var total: number = x.length + y.length;
//     if (x instanceof Array) {
//         x.push('abc');
//     } else { x.substr(1); }

//     return total;
// }

function totalLength(x: string, y: string): number
function totalLength(x: any[], y: any[]): number
function totalLength(x: (string | any[]), y: (any[] | string) ): number {
    var total: number = x.length + y.length;
    if ( x instanceof Array ) {
        x.push('abc');
    } else { x.substr(1); }

    return total;
}

totalLength("Emirhan", "Kaplan");

// Interfaces in TS
interface Todo {
    name: string;
    id: number,
    completed?: boolean;
    state?: TodoState;
}

interface ITodoService {
    add(todo: Todo): Todo;
    delete(todoId: number): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
}

var todoV2: Todo = {
    id: 1,
    name: "Cleaning home.",
    // completed: false
};

interface jQuery {
    (selector: (string | any)): jQueryElement;
    fn: any;
    version: number;
}

// Here is how you extend third party libraries interfaces.
interface jQueryElement {
    data(name: string): any;
    data(name: string, data: any): jQueryElement;
}

interface jQueryElement {
    todo(): Todo;
    todo(todo: Todo): jQueryElement;
}

// $.fn.todo = function(todo?: Todo): Todo {
//     if (todo) {
//         $(this).data('todo', todo);
//     } else {
//         return $(this).data('todo');
//     }
// }

// var $ = <jQuery>function(selector) {
//     // Find DOM Element
// }

// $.version = 1.12;

// var container = $('#container');
// container.data('data', todoV2);
// var savedTodo = container.data('todo');

// container.todo(todoV2);

// Enums
interface NewModelTodo {
    name: string;
    state: TodoState;
    changeState(newState: TodoState): boolean;
}

enum TodoState {
    New = 1,
    Active = 2,
    Completed = 3,
    Deleted = 4
}

var todoV3 = <NewModelTodo>{
    name: "Go to Chinese Garden.",
    state: TodoState.New,
    changeState(this: NewModelTodo, newState: TodoState) { this.state = newState }
};

// Anonymous Types, Anonymous Interfaces
var todoV4: { name: string };

// todoV4 = { age: 41 }; | Wrong!
todoV4 = { name: "Melik" };

// Using anonymous types to accept every type that has length prop into this function.
function totalLengthAcceptsAllTypesWithLengthProp(x: { length: number }, y: { length: number } ): number { return x.length + y.length; }

// Understanding Prototypical Inheritance
// Otherwise known as Prototype-based programming
var todoV5 = {}; // Object literal

function TodoService() {
    this.todos = [];
}

TodoService.prototype.getAll = function() {
    return this.todos;
}

var service = new TodoService();
service.getAll();


// Classes - ES6
class TodoServiceV2 {
    // Declaring attributes
    // todos: Todo[] = [];

    // Declaring static(class) variables in classes
    static lastId: number = 0;

    // Initializing the object in the constructor method.
    constructor(private todos: Todo[]) {
        // this.todos = [];
    }

    getAll = () => this.todos;
    addToLastId = () => TodoServiceV2.lastId += 1;
}

var todoService = new TodoServiceV2([]);

// Creating a object literal with getter and setter methods.
// Normally you would use getter and setter methods in classes not literals.
var todoV6 = {
    name: "Do the dishes.",
    get state() {
        return this._state;
    },
    set state(newState: TodoState) {
        if (newState == TodoState.Completed) {
            var canBeCompleted =
            this.state == TodoState.Active
            || this.state == TodoState.Deleted;

            if (!canBeCompleted) {
                throw "Todo must be Active or Deleted in order to be marked Completed."
            }
        }
        this._state = newState;
    }
}

class SmartTodo {
    _state: TodoState;

    name: string;

    get state() {
        return this._state;
    }
    set state(newState: TodoState) {
        if (newState == TodoState.Completed) {
            var canBeCompleted =
            this.state == TodoState.Active
            || this.state == TodoState.Deleted;

            if (!canBeCompleted) {
                throw "Todo must be Active or Deleted in order to be marked Completed."
            }
        }
        this._state = newState;
    }
}


// Inheriting and extending classes
// & creating abstract classes in TypeScript
abstract class TodoStateChanger {
    constructor(private newState: TodoState) {
    }

    // Abstract function
    abstract canChangeState(todo: Todo): boolean

    changeState(todo: Todo): Todo {
        if (this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        return todo;
    }
}

class CompleteTodoStateChanger extends TodoStateChanger {
    constructor() {
        super(TodoState.Completed);
    }

    canChangeState(todo: Todo): boolean {
        return !!todo && (
            todo.state == TodoState.Active
            || todo.state == TodoState.Deleted
        );
    }
}

// Controlling visibility with access modifiers
class TodoServiceV3 {
    // Declaring attributes
    // todos: Todo[] = [];

    // Declaring private static(class) variables in classes
    private static lastId: number = 0;

    // Declaring protected static(class) variables in classes
    // protected static lastId: number = 0;

    // Initializing the object in the constructor method.
    constructor(private todos: Todo[]) {
        // this.todos = [];
    }

    getAll = () => this.todos;
    // @log
    addToLastId = () => TodoServiceV3.lastId += 1;

    @log
    add() {}
}

var todoServiceV3 = new TodoServiceV3([]);

interface IIdGenerator {
    addToLastId: () => number;
}

// Implementing Interfaces
class TodoServiceImplementsInterface implements ITodoService, IIdGenerator {

    // Declaring private static(class) variables in classes
    private static lastId: number = 0;

    // Initializing the object in the constructor method.
    constructor(private todos: Todo[]) {
    }

    addToLastId = () => TodoServiceImplementsInterface.lastId += 1;
    getAll = () => JSON.parse(JSON.stringify(this.todos));
    add(todo: Todo): Todo {
        todo.id = this.addToLastId();
        this.todos.push(todo);
        return todo;
    }
    delete(todoId: number): void {
        this.todos = this.todos.filter(el => el.id != todoId)
        // var toDelete = this.getById(todoId);
        // var toDeleteIndex = this.todos.indexOf(toDelete);
        // this.todos.splice(toDeleteIndex, 1);
    };
    getById(todoId: number): Todo {
        return this.todos.filter(el => el.id == todoId)[0];
    };
}

// Introducing Generics
function clone<T>(value: T): T {
    let serialized = JSON.stringify(value);
    return JSON.parse(serialized);
}

clone("Hello!");
clone(123);

// Creating generic classes

// Example generic class: Arrays
var array: number[] = [1, 2, 3];
var array2: Array<number> = [1, 2, 3];
var array3: Array<string> = ["1", "2", "3"];

class KeyValuePair<TKey, TValue> {
    constructor(
        public key: TKey,
        public value: TValue,
    ) {

    }
}

let pair1 = new KeyValuePair<number, string>(1, "First")
let pair2 = new KeyValuePair(2, "Second")
let pair3 = new KeyValuePair<number, Date>(2, new Date(Date.now()))

class KeyValuePairPrinter<TKey, TValue> {
    constructor(private pairs: KeyValuePair<TKey, TValue>[]) {
    }

    print() {
        for ( let p of this.pairs ) {
            console.log(`${p.key}: ${p.value}`);
        }
    }
}

var printer = new KeyValuePairPrinter([ pair1, pair2 ]);
printer.print();

// Applying generic constraints
function totalLengthWithGenericTypes<T extends { length: number }>(x: T, y: T) {
    var total: number = x.length + y.length;
    return total;
}

interface IHaveALength {
    length: number;
}

function totalLengthWithGenericTypesAndInterfaces<T extends IHaveALength>(x: T, y: T) {
    var total: number = x.length + y.length;
    return total;
}

class CustomArray<T> extends Array<T> {}
var length = totalLength([1, 2, 3], new CustomArray<number>());

// Organizing your code with namespaces,
// imports and exports
namespace TodoApp.Model {
    export interface TodoNS {
        name: string;
        id: number,
        completed?: boolean;
        state?: TodoApp.Enums.TodoStateNS;
    }
}

namespace DataAccess {
    import Model = TodoApp.Model;
    import TodoNS = Model.TodoNS;
    // import TodoNS = TodoApp.Model.TodoNS;

    interface ITodoServiceNS {
        add(todo: TodoNS): TodoNS;
        delete(todoId: number): void;
        getAll(): TodoNS[];
        getById(todoId: number): TodoNS;
    }
}

namespace TodoApp.Enums {
    export enum TodoStateNS {
        New = 1,
        Active = 2,
        Completed = 3,
        Deleted = 4
    }
}

// Using namespaces to encapsulate private members
interface IjQueryType {
    version: number;
    fn: any;
}

var jQuery: IjQueryType = { version: 1.19, fn: {} };
(function defineType($) {
    if ( $.version < 1.15 )
        throw 'Plugin requires jQuery version 1.15+';
    $.fn.myPlugin = function() {

    }
})(jQuery);

// Internal Modules (Namespaces)
// Internal Module -- namespace function scope
// External Module -- file scope

// TS supports both import syntaxes
// require & import

// Example 1:
// import Model = require("./model");
// import Todo = Model.Todo;

// Example 2:
// import * as Model from "./model";
// import Todo = Model.Todo;

// Example 3:
// import { Todo as TodoTask, TodoState } from "./model";

// Example 4:
// import './jQuery'
// Note: You'd only use this if you were dependent on changes to environment from the imported script.

// Loading External Modules in TS
// Look up how to import external modules with ES6

// Introducing the sample JavaScript application
// Generating declaration files
// TS Declaration Files are used for indicating libraries not written in TS.

// Debugging TypeScript with source maps

// Implementing method decorators
var originalMethod = TodoServiceV3.prototype.addToLastId;

TodoServiceV3.prototype.addToLastId = function(...args) {
    console.log(`add(${JSON.stringify(args)})`);
    let returnValue = originalMethod.apply(this, args);
    console.log(`add(${JSON.stringify(args)}) => ${returnValue}`);

    return returnValue;
}

// Can't use decorators with arrow functions.

// This is not possible if you look at generated code,
// you will see that arrow functions are created in the 
// constructor, they are not part of prototype.

// So when decorator runs, it has no idea about the arrow 
// function.

// For this, you have to create another decorator like
// @logMethod and apply it on the method declaration.
// That might work as in that case, decorator will be
// applied on a property, arrow function is essentially a 
// property.

function log(target: Object, methodName: string, descriptor: TypedPropertyDescriptor<Function>): any {
    var originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        console.log(`${methodName}(${JSON.stringify(args)})`);
        let returnValue = originalMethod.apply(this, args);
        console.log(`${methodName}(${JSON.stringify(args)}) => ${returnValue}`);

        return returnValue;
    }
    return descriptor;
}

// TODO:
// Look into TS Declaration files.
// Look into DefinitelyTyped, Type Definition Manager.
// Learn how to import and manage external modules.
// Revisit TypeScript Essential Training's 9th chapter.