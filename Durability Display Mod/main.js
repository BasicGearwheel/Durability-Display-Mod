var Display = UI.getContext().getWindowManager().getDefaultDisplay();
var Width = Display.getWidth();
var Height = Display.getHeight();
var Display_Width = ( 20 / 9 ) / ( Width / Height ) * 1000;


var DurabilityHUD = new UI.Window({
    location : { x : 0 , y : 120 , width : Display_Width , height : Display_Width * 3 / 20 },
    drawing : [ 
        { type : "background" , color : android.graphics.Color.TRANSPARENT }
    ],
    
    elements : {
        "slot_Carried" : { type : "slot" , x : 0 , y : 0 , size : 30 , visual : false , needClean : true , bitmap : "slot_transparent" },
        "slot_Armor0" : { type : "slot" , x : 0 , y : 30 , size : 30 , visual : false , needClean : true , bitmap : "slot_transparent" },
        "slot_Armor1" : { type : "slot" , x : 0 , y : 60 , size : 30 , visual : false , needClean : true , bitmap : "slot_transparent" },
        "slot_Armor2" : { type : "slot" , x : 0 , y : 90 , size : 30 , visual : false , needClean : true , bitmap : "slot_transparent" },
        "slot_Armor3" : { type : "slot" , x : 0 , y : 120 , size : 30 , visual : false , needClean : true , bitmap : "slot_transparent" },
        "text_Carried" : { type : "text" , x : 35 , y : 10 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } },
        "text_Armor0" : { type : "text" , x : 35 , y : 40 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } },
        "text_Armor1" : { type : "text" , x : 35 , y : 70 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } },
        "text_Armor2" : { type : "text" , x : 35 , y : 100 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } },
        "text_Armor3" : { type : "text" , x : 35 , y : 130 , text : "" , font : { size : 10 , color : android.graphics.Color.WHITE } }
    }
});

DurabilityHUD.setAsGameOverlay( true );
DurabilityHUD.setTouchable( false );
var container = new UI.Container();

Callback.addCallback( "NativeGuiChanged" , function ( screenName ) {
if ( screenName == "in_game_play_screen" ) { 
    container.openAs( DurabilityHUD );
}
else {
    DurabilityHUD.close();
    container.close();
}
});

Callback.addCallback( "tick" , function () {
for ( var i = 0 ; i < 4 ; i ++ ) {
    if ( Player.getArmorSlot( i ).id != 0 ) {
        container.setSlot( "slot_Armor" + i , Player.getArmorSlot( i ).id , Player.getArmorSlot( i ).count , 0 , Player.getArmorSlot( i ).extra );  
        container.setText( "text_Armor" + i , "" + ( Item.getMaxDamage( Player.getArmorSlot( i ).id ) - Player.getArmorSlot( i ).data ) + " / " + Item.getMaxDamage( Player.getArmorSlot( i ).id ) );
    }
    else if ( Player.getArmorSlot( i ).id == 0 ) {
        container.clearSlot( "slot_Armor" + i );
        container.setText( "text_Armor" + i , "" );
    }
}

if ( Player.getCarriedItem().id != 0 ) {
    container.setSlot( "slot_Carried" , Player.getCarriedItem().id , 1 , Player.getCarriedItem().data , Player.getCarriedItem( i ).extra );
    container.setText( "text_Carried" , "" + ( Item.getMaxDamage( Player.getCarriedItem().id ) - Player.getCarriedItem().data ) + " / " + Item.getMaxDamage( Player.getCarriedItem().id ) );
}
else if ( Player.getCarriedItem().id == 0 ) {
    container.clearSlot( "slot_Carried" );
    container.setText( "text_Carried" , "" );
}
});
