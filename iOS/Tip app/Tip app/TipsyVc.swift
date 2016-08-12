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
    
    // MARK: - @Properties
    var tipsyVc = TipCalc(billAmount: 0.0, tipPercent: 0.0)
    
    // MARK: - Initialize Views
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
    }
    
    
    // MARK: - @IBActions
    @IBAction func billAmountChanges(_ sender: AnyObject) {
        
    }
    
    // MARK: - Functions
    func calcTip() {
        tipsyVc.tipPercent = Double(tipPercentSlider.value)
        tipsyVc.billAmount = ((billAmountTextField.text)! as NSString).doubleValue
        
        tipsyVc.calculateTip()
    }
    
    
    

}

