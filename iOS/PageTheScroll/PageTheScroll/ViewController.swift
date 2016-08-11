//
//  ViewController.swift
//  PageTheScroll
//
//  Created by James Brown on 8/11/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var scrollView: UIScrollView!
 
    
    var images = [UIImageView]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        
        var contentWidth: CGFloat = 0.0
        let scrollWidth = scrollView.frame.size.width
        
        for x in 0...2 {
            let image = UIImage(named: "icon\(x).png")
            let imageView = UIImageView(image: image)
            images.append(imageView)
            
            var newX: CGFloat = 0.0
            
            newX = scrollWidth / 2 + scrollWidth * CGFloat(x)
            contentWidth += newX
            
            scrollView.addSubview(imageView)
            
            imageView.frame = CGRect(x: newX - 75, y: (scrollView.frame.size.height / 2) - 75, width: 150, height: 150)
        }
        
        scrollView.clipsToBounds = false
        
        scrollView.contentSize = CGSize(width: contentWidth, height: view.frame.size.height)
    }
    

    @IBAction func viewSwipedRight(_ sender: UISwipeGestureRecognizer) {
        var newX: CGFloat = 0.0
        
        if sender.direction == UISwipeGestureRecognizerDirection.left {
            print("went left")
            newX = scrollView.frame.size.width + scrollView.contentOffset.x
        } else if sender.direction == UISwipeGestureRecognizerDirection.right {
            print("went right")
            newX =  scrollView.contentOffset.x - scrollView.frame.size.width
        }
        scrollView.setContentOffset(CGPoint(x: newX, y: 0), animated: true)
        
    }
    
}

