//
//  VideoVC.swift
//  TableViewsAPp
//
//  Created by James Brown on 8/14/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import UIKit

class VideoVC: UIViewController {
    
    @IBOutlet weak var webView: UIWebView!
    @IBOutlet weak var titleLbl: UILabel!
    
    private var _modelData: ModelData!
    
    var modelData: ModelData {
        get {
            return _modelData
        }
        set {
            _modelData = newValue
        }
    }
    
    

    override func viewDidLoad() {
        super.viewDidLoad()

        titleLbl.text = modelData.videoTitle
        webView.loadHTMLString(modelData.videoTitle, baseURL: nil)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
