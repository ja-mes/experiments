//
//  File.swift
//  mvc-test
//
//  Created by James Brown on 8/15/16.
//  Copyright © 2016 James Brown. All rights reserved.
//

import Foundation

class Person {
    private var _firstName = ""
    private var _lastName = ""
    
    var firstName: String {
        get {
            return _firstName
        }
        set {
            _firstName = newValue
        }
     }
    
    var lastName: String {
        return _lastName
    }
    
    init(first: String, last: String) {
        self._firstName = first
        self._lastName = last
        
    }
    
    var fullName: String {
        return "\(_firstName) \(_lastName)"
    }
}
