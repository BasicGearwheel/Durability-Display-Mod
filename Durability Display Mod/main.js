var Display = UI.getContext().getWindowManager().getDefaultDisplay();
var Width = Display.getWidth();
var Height = Display.getHeight();
var Display_Width = ( 20 / 9 ) / ( Width / Height ) * 1000;
var Max_HeightUnit = Height / Width * 1000;

var DurabilityHUD = new UI.Window({
    location : { x : __config__.get( "x" ) , y : Max_HeightUnit / 1000 * __config__.get( "y" ) , width : Display_Width , height : Display_Width * 3 / 20 } ,
    drawing : [ 
        { type : "background" , color : android.graphics.Color.TRANSPARENT }
    ] ,
    
    elements : {
        "slot_Carried" : { type : "slot" , x : 0 , y : 0 , size : 30 , visual : false , bitmap : "slot_transparent" } ,
        "slot_Armor0" : { type : "slot" , x : 0 , y : 30 , size : 30 , visual : false , bitmap : "slot_transparent" } ,
        "slot_Armor1" : { type : "slot" , x : 0 , y : 60 , size : 30 , visual : false , bitmap : "slot_transparent" } ,
        "slot_Armor2" : { type : "slot" , x : 0 , y : 90 , size : 30 , visual : false , bitmap : "slot_transparent" } ,
        "slot_Armor3" : { type : "slot" , x : 0 , y : 120 , size : 30 , visual : false , bitmap : "slot_transparent" } ,
        "text_Carried" : { type : "text" , x : 35 , y : 10 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } } ,
        "text_Armor0" : { type : "text" , x : 35 , y : 40 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } } ,
        "text_Armor1" : { type : "text" , x : 35 , y : 70 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } } ,
        "text_Armor2" : { type : "text" , x : 35 , y : 100 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } } ,
        "text_Armor3" : { type : "text" , x : 35 , y : 130 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } }
    }
});

DurabilityHUD.setAsGameOverlay( true );
DurabilityHUD.setTouchable( false );
var DurabilityContainer = new UI.Container();

Callback.addCallback( "NativeGuiChanged" , function ( screenName ) {

screenName == "in_game_play_screen" && DurabilityContainer.openAs( DurabilityHUD );

screenName != "in_game_play_screen" && DurabilityHUD.close();
screenName != "in_game_play_screen" && DurabilityContainer.close();

});

__config__.get( "Display_Score_Rate" ) == true && 
Callback.addCallback( "tick" , function () {
for ( var i = 0 ; i < 4 ; i ++ ) {
    let armorSlot = Player.getArmorSlot( i );
    if ( armorSlot.id == 0 ) {
        DurabilityContainer.clearSlot( "slot_Armor" + i );
        DurabilityContainer.setText( "text_Armor" + i , "" );
    }
    else {
        DurabilityContainer.setSlot( "slot_Armor" + i , armorSlot.id , armorSlot.count , 0 , armorSlot.extra );

        __config__.get( "Maximum_Number_Of_Characters" ) >= ( Item.getMaxDamage( armorSlot.id ) - armorSlot.data ).toString().length ?
        DurabilityContainer.setText( "text_Armor" + i , ( Item.getMaxDamage( armorSlot.id ) - armorSlot.data ) + " / " + Item.getMaxDamage( armorSlot.id ) ) :
        DurabilityContainer.setText( "text_Armor" + i , Item.getMaxDamage( armorSlot.id ) - armorSlot.data );
    }
}
let carriedItem = Player.getCarriedItem();
if ( carriedItem.id == 0 ) {
    DurabilityContainer.setText( "text_Carried" , "" );
    DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , carriedItem.data ,  carriedItem.extra );
}
else if ( ToolAPI.getCarriedToolData() != null ) {
    DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , 0 ,  carriedItem.extra );
    __config__.get( "Maximum_Number_Of_Characters" ) >= ( Item.getMaxDamage( carriedItem.id ) - carriedItem.data ).toString().length ?
    DurabilityContainer.setText( "text_Carried" , ( Item.getMaxDamage( carriedItem.id ) - carriedItem.data ) + " / " + Item.getMaxDamage( carriedItem.id ) ) :
    DurabilityContainer.setText( "text_Carried" , Item.getMaxDamage( carriedItem.id ) - carriedItem.data );
}
else {
    switch ( carriedItem.id ) {
        case 259 :
        case 261 :
        case 267 :
        case 268 :
        case 272 :
        case 276 :
        case 283 :
        case 290 :
        case 291 :
        case 292 :
        case 293 :
        case 294 :
        case 346 :
        case 359 :
        case 455 :
        case 471 :
        case 513 :
            DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , 0 ,  carriedItem.extra );
            __config__.get( "Maximum_Number_Of_Characters" ) >= ( Item.getMaxDamage( carriedItem.id ) - carriedItem.data ).toString().length ?
            DurabilityContainer.setText( "text_Carried" , ( Item.getMaxDamage( carriedItem.id ) - carriedItem.data ) + " / " + Item.getMaxDamage( carriedItem.id ) ) :
            DurabilityContainer.setText( "text_Carried" , Item.getMaxDamage( carriedItem.id ) - carriedItem.data );
        break;
        default :
            DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , carriedItem.data ,  carriedItem.extra );
            DurabilityContainer.setText( "text_Carried" , carriedItem.count );
        break;
    }
}
});

__config__.get( "Display_Score_Rate" ) == false && 
Callback.addCallback( "tick" , function () {
for ( var i = 0 ; i < 4 ; i ++ ) {
    let armorSlot = Player.getArmorSlot( i );
    if ( armorSlot.id == 0 ) {
        DurabilityContainer.clearSlot( "slot_Armor" + i );
        DurabilityContainer.setText( "text_Armor" + i , "" );
    }
    else {
        DurabilityContainer.setSlot( "slot_Armor" + i , armorSlot.id , armorSlot.count , 0 , armorSlot.extra );
        DurabilityContainer.setText( "text_Armor" + i , Item.getMaxDamage( armorSlot.id ) - armorSlot.data );
    }
}

let carriedItem = Player.getCarriedItem();
if ( carriedItem.id == 0 ) {
    DurabilityContainer.setText( "text_Carried" , "" );
    DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , carriedItem.data ,  carriedItem.extra );
}
else if ( ToolAPI.getCarriedToolData() != null ) {
    DurabilityContainer.setText( "text_Carried" , Item.getMaxDamage( carriedItem.id ) - carriedItem.data );
    DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , 0 ,  carriedItem.extra );
}
else {
    switch ( carriedItem.id ) {
        case 259 :
        case 261 :
        case 267 :
        case 268 :
        case 272 :
        case 276 :
        case 283 :
        case 290 :
        case 291 :
        case 292 :
        case 293 :
        case 294 :
        case 346 :
        case 359 :
        case 455 :
        case 471 :
        case 513 :
            DurabilityContainer.setText( "text_Carried" , Item.getMaxDamage( carriedItem.id ) - carriedItem.data );
            DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , 0 ,  carriedItem.extra );
        break;
        default :
            DurabilityContainer.setSlot( "slot_Carried" , carriedItem.id , 1 , carriedItem.data ,  carriedItem.extra );
            DurabilityContainer.setText( "text_Carried" , carriedItem.count );
        break;
    }
}
});

if ( __config__.get( "Left_Hand" ) == true ) {
var LeftHandHUD = new UI.Window({
    location : { x : __config__.get( "x" ) , y : Max_HeightUnit / 1000 * __config__.get( "y" ) + Display_Width * 3 / 20 , width : Display_Width , height : Display_Width * 3 / 100 } ,
    drawing : [ 
        { type : "background" , color : android.graphics.Color.TRANSPARENT }
    ] ,

    elements : {
        "slot_LeftHand" : { type : "slot" , x : 0 , y : 0 , size : 30 , visual : false , bitmap : "slot_transparent" } ,
        "text_LeftHand" : { type : "text" , x : 35 , y : 10 , font : { size : 10 , color : android.graphics.Color.WHITE } }
    }
});

LeftHandHUD.setAsGameOverlay( true );
LeftHandHUD.setTouchable( false );
var LeftHandContainer = new UI.Container();

Callback.addCallback( "NativeGuiChanged" , function ( screenName ) {

screenName == "in_game_play_screen" && LeftHandContainer.openAs( LeftHandHUD );

screenName != "in_game_play_screen" && LeftHandHUD.close();
screenName != "in_game_play_screen" && LeftHandContainer.close();

});

__config__.get( "Display_Score_Rate" ) == true && 
Callback.addCallback( "tick" , function () {
    let LeftHandItem = Player.getOffhandItem();
    if ( LeftHandItem.id == 0 ) {
        LeftHandContainer.setText( "text_LeftHand" , "" );
        LeftHandContainer.setSlot( "slot_LeftHand" , LeftHandItem.id , 1 , LeftHandItem.data ,  LeftHandItem.extra );
    }
    else if ( ToolAPI.getToolData( LeftHandItem.id ) != null || LeftHandItem.id == 513 ) {
        LeftHandContainer.setSlot( "slot_LeftHand" , LeftHandItem.id , 1 , 0 ,  LeftHandItem.extra );
        __config__.get( "Maximum_Number_Of_Characters" ) >= ( Item.getMaxDamage( LeftHandItem.id ) - LeftHandItem.data ).toString().length ?
        LeftHandContainer.setText( "text_LeftHand" , ( Item.getMaxDamage( LeftHandItem.id ) - LeftHandItem.data ) + " / " + Item.getMaxDamage( LeftHandItem.id ) ) :
        LeftHandContainer.setText( "text_LeftHand" , Item.getMaxDamage( LeftHandItem.id ) - LeftHandItem.data );
    }
    else {
        LeftHandContainer.setSlot( "slot_LeftHand" , LeftHandItem.id , 1 , LeftHandItem.data ,  LeftHandItem.extra );
        LeftHandContainer.setText( "text_LeftHand" , Item.getMaxStack( LeftHandItem.id ) == 1 ? "" : LeftHandItem.count );
    }
});

__config__.get( "Display_Score_Rate" ) == false && 
Callback.addCallback( "tick" , function () {
    let LeftHandItem = Player.getOffhandItem();
    if ( LeftHandItem.id == 0 ) {
        LeftHandContainer.setText( "text_LeftHand" , "" );
        LeftHandContainer.setSlot( "slot_LeftHand" , LeftHandItem.id , 1 , LeftHandItem.data ,  LeftHandItem.extra );
    }
    else if ( ToolAPI.getToolData( LeftHandItem.id ) != null || LeftHandItem.id == 513 ) {
        LeftHandContainer.setSlot( "slot_LeftHand" , LeftHandItem.id , 1 , 0 ,  LeftHandItem.extra );
        LeftHandContainer.setText( "text_LeftHand" , Item.getMaxDamage( LeftHandItem.id ) - LeftHandItem.data );
    }
    else {
        LeftHandContainer.setSlot( "slot_LeftHand" , LeftHandItem.id , 1 , LeftHandItem.data ,  LeftHandItem.extra );
        LeftHandContainer.setText( "text_LeftHand" , Item.getMaxStack( LeftHandItem.id ) == 1 ? "" : LeftHandItem.count );
    }
});
}