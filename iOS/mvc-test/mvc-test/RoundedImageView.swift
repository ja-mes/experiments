//
//  RoundedImageView.swift
//  mvc-test
//
//  Created by James Brown on 8/15/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class RoundedImageView: UIImageView {

    override func awakeFromNib() {
        self.layer.cornerRadius = 5.0
        self.clipsToBounds = true
    }
}
