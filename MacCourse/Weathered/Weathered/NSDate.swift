//
//  NSDate.swift
//  Weathered
//
//  Created by Jake Christopher on 4/7/17.
//  Copyright © 2017 Jake Christopher Attard. All rights reserved.
//

import Foundation

extension Date {
    func dayOfTheWeek() -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "EEEE"
        return dateFormatter.string(from: self)
    }
}
