//
//  ModelData.swift
//  TableViewsAPp
//
//  Created by James Brown on 8/14/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import Foundation

class ModelData {
    private var _imageUrl: String
    private var _videoUrl: String
    private var _videoTitle: String
    
    var imageUrl: String {
        return _imageUrl
    }
    
    var videoUrl: String {
        return _videoUrl
    }
    
    var videoTitle: String {
        return _videoTitle
    }
    
    init(imageUrl: String, videoUrl: String, videoTitle: String) {
        _imageUrl = imageUrl
        _videoUrl = videoUrl
        _videoTitle = videoTitle
    }
}
