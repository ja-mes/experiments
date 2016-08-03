//
//  ViewController.swift
//  Navigation Bar
//
//  Created by James Brown on 8/3/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    var time = 0
    var timer = NSTimer()
    
    @IBOutlet var tickerLabel: UILabel!

    @IBAction func resetButtonDidTouch(sender: AnyObject) {
        time = 0
        timer.invalidate()
        tickerLabel.text = "0"
    }
    
    @IBAction func playButtonDidTouch(sender: AnyObject) {
        timer = NSTimer.scheduledTimerWithTimeInterval(1, target: self, selector: #selector(ViewController.result), userInfo: nil, repeats: true)
    }
    
    @IBAction func stopButtonDidTouch(sender: AnyObject) {
        timer.invalidate()
        tickerLabel.text = String(time)
    }
    
    func result() {
        time += 1
        tickerLabel.text = String(time)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

