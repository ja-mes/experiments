//
//  ViewController.swift
//  Shake for a sound
//
//  Created by James Brown on 12/2/15.
//  Copyright © 2015 James Brown. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {
    
    var player: AVAudioPlayer = AVAudioPlayer()
    let fileNames = ["1", "2", "3", "4", "5"]
    
    
    func playAudio(path:String) {
        do {
            try player = AVAudioPlayer(contentsOfURL: NSURL(fileURLWithPath: path))
        }
        catch {
            // handle error here
        }
        
        player.play()
    }
    
    override func motionEnded(motion: UIEventSubtype, withEvent event: UIEvent?) {
        if event?.subtype == UIEventSubtype.MotionShake {
            
            let randomSound = fileNames[Int(arc4random_uniform(UInt32(fileNames.count)))]
            
            if let path = NSBundle.mainBundle().pathForResource(randomSound, ofType: "mp3") {
                playAudio(path)
            }
            
        }
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

