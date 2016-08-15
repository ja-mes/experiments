//
//  MainCell.swift
//  TableViewsAPp
//
//  Created by James Brown on 8/14/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class MainCell: UITableViewCell {

    @IBOutlet weak var videoPreviewImage: UIImageView!
    @IBOutlet weak var videoTitleLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    func updateUI(modelData: ModelData) {
        videoTitleLabel.text = modelData.videoTitle
        
        let url = URL(string: modelData.imageUrl)!
        
        DispatchQueue.global().async {
            do {
                let data = try Data(contentsOf: url)
                
                DispatchQueue.global().sync {
                    self.videoPreviewImage.image = UIImage(data: data)
                }
            } catch  {
                
            }
        }
    }

}
