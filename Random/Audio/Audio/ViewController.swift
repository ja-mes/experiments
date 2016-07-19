//
//  ViewController.swift
//  Audio
//
//  Created by James Brown on 12/1/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {
    
    var player: AVAudioPlayer = AVAudioPlayer()

    @IBOutlet var volumeSlider: UISlider!
    @IBOutlet var scrubberSlider: UISlider!
    
    
    @IBAction func playButton(sender: AnyObject) {
        player.play()
    }
    
    @IBAction func pauseButton(sender: AnyObject) {
        player.pause()
    }
    
    @IBAction func stopButton(sender: AnyObject) {
        player.pause()
        setUpPlayer()
    }
    
    @IBAction func adjustVolume(sender: AnyObject) {
        player.volume = sender.value
    }
    
    @IBAction func adjustScrubber(sender: AnyObject) {
        let newTime = NSTimeInterval(scrubberSlider.value)
        player.currentTime = newTime
        
        
    }
    
    
    func setUpPlayer() {
        let audioPath = NSBundle.mainBundle().pathForResource("bach", ofType: "mp3")!
        
        do {
            try player = AVAudioPlayer(contentsOfURL: NSURL(fileURLWithPath: audioPath))
        }
        catch {
            // Handle error
        }
        
        scrubberSlider.minimumValue = 0
        scrubberSlider.maximumValue = Float(player.duration)

    }
    
    
    func tick() {
        scrubberSlider.value = Float(player.currentTime)
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
         NSTimer.scheduledTimerWithTimeInterval(0.01, target: self, selector: "tick", userInfo: nil, repeats: true)
        
        setUpPlayer()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

