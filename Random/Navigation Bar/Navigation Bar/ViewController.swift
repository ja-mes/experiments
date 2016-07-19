//
//  ViewController.swift
//  Navigation Bar
//
//  Created by James Brown on 11/25/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    var timer = NSTimer()
    var timeCounter = 0
    
    @IBOutlet var time: UILabel!
    
    @IBAction func playButton(sender: AnyObject) {
        timer.invalidate()
        timer = NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector: Selector("result"), userInfo: nil, repeats: true)
    }
    
    @IBAction func pauseButton(sender: AnyObject) {
        timer.invalidate()
    }
    @IBAction func clearButton(sender: AnyObject) {
        timeCounter = 0;
        time.text = String(timeCounter)
    }


    func result() {
        timeCounter++
        time.text = String(timeCounter)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

