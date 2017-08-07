//
//  NSButton.swift
//  Weathered
//
//  Created by Jake Christopher on 5/7/17.
//  Copyright © 2017 Jake Christopher Attard. All rights reserved.
//

import Cocoa

extension NSButton {
    func styleButtonText(button: NSButton, buttonName: String, fontColor: NSColor, alignment: NSTextAlignment, font: String, size: CGFloat) {
        let paragraphStyle = NSMutableParagraphStyle()
        paragraphStyle.alignment = alignment
        
        button.attributedTitle = NSAttributedString(string: buttonName, attributes: [NSForegroundColorAttributeName: fontColor, NSParagraphStyleAttributeName: paragraphStyle, NSFontAttributeName: NSFont(name: font, size: size)!])
    }
}
