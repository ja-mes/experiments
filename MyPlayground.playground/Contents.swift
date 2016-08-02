//: Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"

let canvas = UIView(frame: CGRectMake(0, 0, 200, 200))
canvas.backgroundColor = UIColor(red: 0.54, green: 0.43, blue: 0.96, alpha: 1)

let title = UILabel(frame: CGRectMake(0, 70, 200, 50))
title.backgroundColor = UIColor(red: 0.54, green: 0.43, blue: 0.96, alpha: 1)
title.textColor = UIColor.whiteColor()
title.text = "Learning Swift"
title.textAlignment = .Center
title.font = UIFont(name: "Avenir Next", size: 24)

canvas.addSubview(title)

// Constants and variables
let myName: String = "Joe"
var age = 100
age = 80

// Value types
let label = "the width is "
let width = 100
let width_label = label + String(width)

// Arrays
var colors = ["red", "green", "blue"]
colors[0]
colors.append("orange")
colors.removeAtIndex(1)


// Control Flow
if age > 80 {
    print("old age")
}
else {
    print("Not old")
}

age > 80 ? print("old") : print("not old")

switch age {
    case 30...100: "old"
    case 18...29: "not old"
    case 0...17: "young"
    default: "not sure"
}

for color in colors {
    print("This color is \(color)")
}

// Functions
func pointToRetina(point: Int) -> Int {
    return point * 2
}

var myNewValue = pointToRetina(320)

// Class and struct
struct UserStruct {
    var name: String
    var age: Int
    var job: String
}

var user = UserStruct(name: "J", age: 17, job: "car")

class UserClass {
    var name: String
    var age: Int
    var job: String
    
    init(name: String, age: Int, job: String) {
        self.name = name
        self.age = age
        self.job = job
    }
}


var userA = UserStruct(name: "J", age: 16, job: "ck")
var userB = userA
userB.name = "k"
userA.name

var personA = UserClass(name: "James", age: 17, job: "car")
var personB = personA
personB.name = "Joe"
personA.name

// Optionals
var answer: String?
UILabel().text = answer ?? ""























