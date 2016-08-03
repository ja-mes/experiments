//
//  StoriesTableViewController.swift
//  MyApp
//
//  Created by James Brown on 8/2/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class StoriesTableViewController: UITableViewController {
    @IBAction func menuButtonDidTouch(sender: AnyObject) {
        performSegueWithIdentifier("MenuSegue", sender: self)
    }
    
    @IBAction func loginButtonDidTouch(sender: AnyObject) {
        performSegueWithIdentifier("LoginSeque", sender: self)
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("StoryCell")! as! StoryTableViewCell
        tableView.rowHeight = 100
        
        cell.titleLabel.text = "Learn iOS Design and Xcode"
        cell.badgeImageView.image = UIImage(named: "badge-apple")
        cell.avatarImageView.image = UIImage(named: "content-avatar-default")
        cell.authorLabel.text = "James, blah blah"
        cell.timeLabel.text = "5m"
        cell.upvoteButton.setTitle("59", forState: UIControlState.Normal)
        cell.commentButton.setTitle("50", forState: UIControlState.Normal)
        
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        performSegueWithIdentifier("WebSeque", sender: self)
        
        tableView.deselectRowAtIndexPath(indexPath, animated: true)
    }
}
