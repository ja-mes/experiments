//
//  MusicListVc.swift
//  Swaping screens
//
//  Created by James Brown on 8/12/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class MusicListVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = UIColor.blue
    }

    @IBAction func backButtonPressed(_ sender: AnyObject) {
        dismiss(animated: true, completion: nil)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func load3rdScreenPressed(_ sender: AnyObject) {
        let songTitle = "A song"
        performSegue(withIdentifier: "PlaySongVC", sender: songTitle)
    }

   
    override func prepare(for segue: UIStoryboardSegue, sender: AnyObject?) {
        if let destination = segue.destination as? PlaySongVC {
            if let song = sender as? String {
                destination.selectedSong = song
            }
            
        }
    }
}
