//
//  ViewController.swift
//  Tip app
//
//  Created by James Brown on 8/11/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class TipsyVC: UIViewController {
    
    // MARK: - @IBOutles
    @IBOutlet weak var tipsyTitleView: UIView!
    @IBOutlet weak var tipsyTitleLabel: UILabel!
    @IBOutlet weak var billAmountTextField: UITextField!
    @IBOutlet weak var tipPercentLabel: UILabel!
    @IBOutlet weak var tipPercentSlider: UISlider!
    @IBOutlet weak var tipAmountLabel: UILabel!
    @IBOutlet weak var totalAmountLabel: UILabel!
    
    @IBOutlet weak var splitSlider: UISlider!
    @IBOutlet weak var splitLabel: UILabel!
    @IBOutlet weak var splitAmountLabel: UILabel!
    
    // MARK: - @Properties
    var tipCalc = TipCalc(billAmount: 0.0, tipPercent: 0.0)
    
    // MARK: - Initialize Views
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tipPercentValue()
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
        super.touchesBegan(touches, with: event)
    }

    
    // MARK: - @IBActions
    @IBAction func billAmountChanges(_ sender: AnyObject) {
        calcTip()
    }
    
    @IBAction func tipPercentChanged(_ sender: AnyObject) {
        tipPercentValue()
        calcTip()
    }
    
    @IBAction func splitChanged(_ sender: AnyObject) {
        calculateSplit()
    }
    
    // MARK: - Functions
    func calcTip() {
        tipCalc.tipPercent = Double(tipPercentSlider.value)
        tipCalc.billAmount = ((billAmountTextField.text)! as NSString).doubleValue
        
        tipCalc.calculateTip()
        
        updateUI()
        calculateSplit()
    }
    
    func updateUI() {
        tipAmountLabel.text = String(format: "$%0.2f", tipCalc.tipAmount)
        totalAmountLabel.text = String(format: "$%0.2f", tipCalc.totalAmount)
    }
    
    func tipPercentValue() {
        tipPercentLabel.text = "Tip \(Int(tipPercentSlider.value * 100))%"
    }
    
    func calculateSplit() {
        let sliderValue = Int(splitSlider.value)
        let splitAmount = tipCalc.totalAmount / Double(sliderValue)
        splitAmountLabel.text = String(format: "$%.2f", splitAmount)
        
        splitLabel.text = "Split \(sliderValue)"
    }

    
}
















