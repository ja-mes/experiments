//
//  StoryTableViewCell.swift
//  MyApp
//
//  Created by James Brown on 8/3/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class StoryTableViewCell: UITableViewCell {

    @IBOutlet var badgeImageView: UIImageView!
    @IBOutlet var titleLabel: UILabel!
    @IBOutlet var timeLabel: UILabel!
    @IBOutlet var avatarImageView: UIImageView!
    @IBOutlet var authorLabel: UILabel!
    @IBOutlet var upvoteButton: SpringButton!
    @IBOutlet var commentButton: SpringButton!
    
    @IBAction func upvoteButtonDidTouch(sender: AnyObject) {
        upvoteButton.animation = "pop"
        upvoteButton.force = 3
        upvoteButton.animate()
    }
    
    @IBAction func commentButtonDidTouch(sender: AnyObject) {
        commentButton.animation = "pop"
        commentButton.force = 3
        commentButton.animate()
    }
}
