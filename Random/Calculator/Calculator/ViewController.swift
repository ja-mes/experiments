//
//  ViewController.swift
//  Calculator
//
//  Created by James Brown on 12/2/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

extension String {
    
    subscript (i: Int) -> Character {
        return self[self.startIndex.advancedBy(i)]
    }
    
    subscript (i: Int) -> String {
        return String(self[i] as Character)
    }
    
    subscript (r: Range<Int>) -> String {
        return substringWithRange(Range(start: startIndex.advancedBy(r.startIndex), end: startIndex.advancedBy(r.endIndex)))
    }
}

class ViewController: UIViewController {
    var displayValue:String = ""
    
    var calculation:String = ""
    
    var shouldResetNextPess = false
    
    func calculate() {
        var lastChar:String = ""
        
        if(calculation.characters.count > 0) {
            lastChar = String(calculation[calculation.endIndex.predecessor()])
        }
        
        
        if let _ = Double(lastChar) {
            
        }
        else {
            calculation = String(calculation.characters.dropLast())
        }
        if(calculation == "") {
            calculation = "0"
        }


        
        let mathExpression = NSExpression(format: calculation)
        
        if let result = mathExpression.expressionValueWithObject(nil, context: nil) as? Double {
            var str = String(result)
            
            let numberFormater = NSNumberFormatter()
            numberFormater.numberStyle = NSNumberFormatterStyle.DecimalStyle
            numberFormater.maximumFractionDigits = 1000
            str = numberFormater.stringFromNumber(Double(str)!)!

            
            if(str == "0") {
                displayValue = ""
                resultLabel.text = "0"
            }
            else {
                displayValue = str
                resultLabel.text = displayValue
            }
            
            calculation = String(result)
        }
    }
    
    func pressSymbol(symbol:String) {
        if(calculation.characters.count > 0) {
            let lastChar = String(calculation[calculation.endIndex.predecessor()])
            
            func update() {
                calculate()
                shouldResetNextPess = true
                calculation += symbol
            }
            
            if let _ = Double(lastChar) {
                update()
            }
            else if lastChar == "." {
                update()
            }
            else {
                // lastChar must be a symbol - replace lastChar with new symbol
                calculation = String(calculation.characters.dropLast())
                update()
            }
            
        }
        
    }

    @IBOutlet var resultLabel: UILabel!
    @IBOutlet var clearButton: UIButton!
    
    @IBAction func buttonPress(sender: AnyObject) {
        if let buttonValue:String = sender.titleLabel!!.text! {
            
            if(buttonValue == "-" || buttonValue == "+") {
                pressSymbol(buttonValue)
            }
            else if buttonValue == "x" {
                pressSymbol("*")
            }
            else if buttonValue == "÷" {
                pressSymbol("/")
            }
            else if buttonValue == "%" {
                if Double(displayValue) != nil {
                    var reversedCalculation = String(calculation.characters.reverse())
                    var symbol = ""
                    var firstNum = ""
                    
                    for i in reversedCalculation.characters {
                        let str = String(i)
                        
                        if let _ = Double(str) {
                            reversedCalculation = String(reversedCalculation.characters.reverse().dropLast().reverse())
                            
                            firstNum = "\(str)\(firstNum)"
                        }
                        else if str == "." {
                            reversedCalculation = String(reversedCalculation.characters.reverse().dropLast().reverse())
                            firstNum = "\(str)\(firstNum)"
                        }
                        else {
                            symbol = str
                            break
                        }
                    }
                    
                    var secondNum = ""
                    var hasHitFirstSymbol = false
                    
                    for i in reversedCalculation.characters {
                        let str = String(i)
                        
                        
                        if let _ = Double(str) {
                            if(hasHitFirstSymbol) {
                                secondNum = "\(str)\(secondNum)"
                            }
                        }
                        else if str == "." {
                            if(hasHitFirstSymbol) {
                                secondNum = "\(str)\(secondNum)"
                            }
                        }
                        else {
                            if(hasHitFirstSymbol == false) {
                                hasHitFirstSymbol = true
                            }
                            else {
                                break
                            }
                        }
                    }
                    
                    calculation = String(reversedCalculation.characters.reverse())
                    
                    
                    let partOf100 = Double(firstNum)! * 0.01
                    
                    if(secondNum == "") {
                        calculation += String(partOf100)
                        displayValue = String(partOf100)
                        resultLabel.text = displayValue
                    }
                    else {
                        
                        if symbol == "+" || symbol == "-" {
                            let num = Double(secondNum)! * partOf100
                            calculation += String(num)
                            displayValue = String(num)
                            resultLabel.text = displayValue
                        }
                        else if symbol == "/" || symbol == "*" {
                            calculation += "\(partOf100)"
                            displayValue = String(partOf100)
                            resultLabel.text = displayValue
                        }
                    }

                }
            }
            else if(buttonValue == "+/-") {
                var reversedCalculation = String(calculation.characters.reverse())
                var num = ""
                
                for i in reversedCalculation.characters {
                    let str = String(i)
                    
                    if let _ = Double(str) {
                        reversedCalculation = String(reversedCalculation.characters.reverse().dropLast().reverse())
                        num = "\(str)\(num)"
                    }
                    else if str == "." {
                        reversedCalculation = String(reversedCalculation.characters.reverse().dropLast().reverse())
                        num = "\(str)\(num)"
                    }
                    else {
                        break
                    }
                }
                
                num = "-\(num)"
                calculation = String(reversedCalculation.characters.reverse())
                calculation += num
                
                displayValue = num
                resultLabel.text = displayValue
            }
            else if(buttonValue == "←") {
                if calculation.characters.count > 0 {
                    let lastChar = String(calculation[calculation.endIndex.predecessor()])
                    
                    func update() {
                        displayValue = String(displayValue.characters.dropLast())

                        if(displayValue == "") {
                            resultLabel.text = "0"
                        }
                        else {
                            resultLabel.text = displayValue
                        }
                        
                        calculation = String(calculation.characters.dropLast())
                    }
                    
                    if let _ = Double(lastChar) {
                        update()
                    }
                    else if lastChar == "." {
                        update()
                    }
                    else {
                        // lastChar must be a operator - do nothing
                        resultLabel.text = "0"
                    }
                }
                else {
                    resultLabel.text = "0"
                }
                
            }
            else if(buttonValue == "AC") {
                displayValue = ""
                resultLabel.text = "0"
                calculation = ""
                shouldResetNextPess = false
            }
             else if(buttonValue == "=") {
                calculate()
            }
            else {
                if (Int(buttonValue) != nil || buttonValue == ".") {
                    
                    
                    if(calculation.characters.count > 1 && buttonValue == ".") {
                        let lastChar = String(calculation[calculation.characters.count - 1])
                        let secondLastChar = String(calculation[calculation.characters.count - 2])
                        
                        let reversedCalculation = String(calculation.characters.reverse())
                        
                        
                        // if the last two numbers are .0 delete them
                        if(lastChar == "0" && secondLastChar == ".") {
                            calculation = String(calculation.characters.dropLast().dropLast())
                        }
                        else if buttonValue == "." {
                            for i in reversedCalculation.characters {
                                let str = String(i)
                                
                                if let _ = Double(str) {
                                    continue
                                }
                                else if str == "." {
                                    return
                                }
                                else {
                                    break
                                }
                            }
                        }

                    }
                    
                    
                    calculation += buttonValue
                    
                    if(shouldResetNextPess) {
                        displayValue = buttonValue
                        shouldResetNextPess = false
                    }
                    else {
                        displayValue += buttonValue
                    }
                    
                    
                    
                    var partBeforeDecimal = ""
                    var decimal = false
                    
                    for i in displayValue.characters.reverse() {
                        let str = String(i)
                        
                        if let _ = Double(str) {
                            partBeforeDecimal = "\(str)\(partBeforeDecimal)"
                        }
                        else if str == "." {
                            decimal = true
                            break
                        }
                        else {
                            break
                        }
                    }
                    
                    let numberFormater = NSNumberFormatter()
                    numberFormater.numberStyle = NSNumberFormatterStyle.DecimalStyle
                    numberFormater.maximumFractionDigits = 0
                    resultLabel.text = numberFormater.stringFromNumber(Double(displayValue)!)!
                    
                    if(decimal) {
                        resultLabel.text! += ".\(partBeforeDecimal)"
                    }

                    
                    
                }
                
            }
            
            
            if(calculation.characters.count > 0 || calculation == "0") {
                clearButton.setTitle("C", forState: UIControlState.Normal)
            }
            
            
            if(buttonValue == "C") {
                displayValue = ""
                resultLabel.text = "0"
                
                var reversedCalculation = String(calculation.characters.reverse())
                
                func update() {
                    reversedCalculation = String(reversedCalculation.characters.reverse().dropLast().reverse())
                }
                
                for i in reversedCalculation.characters {
                    let str = String(i)
                    
                    if let _ = Double(str) {
                        update()
                    }
                    else if str == "." {
                        update()
                    }
                    else {
                        // we hit a symbol
                        break
                    }
                }
                
                calculation = String(reversedCalculation.characters.reverse())
                
                clearButton.setTitle("AC", forState: UIControlState.Normal)
            }
        }

    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

