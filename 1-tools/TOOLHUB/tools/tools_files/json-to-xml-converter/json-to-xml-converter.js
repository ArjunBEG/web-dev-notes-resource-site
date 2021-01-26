var resulteditor, editor;

function json2xmlConvert() {
  try {

    var t = editor.get();
    t = ( typeof t == 'object' ) ? t : JSON.parse( t );


    if ( '' != $.trim( t ) ) {
      var r, o = ( new XML.ObjTree ).writeXML( t );
      o = decodeSpecialCharacter( o );

      try {
        r = $.parseXML( o );
        }
        catch ( e ) {
        r = !1
      }
      0 == r && ( o = o.substr( 0, 39 ) + "<root>" + o.substr( 39 ) + "</root>" ), resulteditor.setValue( vkbeautify.xml( o ) );
    }
  } catch ( e ) {
    resulteditor.setValue( "Error in data" )
  }
}
function decodeSpecialCharacter( e ) {
  return e.replace( /\&amp;/g, "&" ).replace( /\&gt;/g, ">" ).replace( /\&lt;/g, "<" ).replace( /\&quot;/g, '"' )
}

$( document ).ready( function () {



  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    mode: "application/xml",
    lineNumbers: true,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    alignCDATA: true,

  } );

  var container = document.getElementById( "input-text" );
  var options = {
    ajv: Ajv( {
        allErrors: true,
        verbose: true
      } ),
      mode: "code",
    "indentation": 4,
    "statusBar": true,
    modes: [ 'code', 'form', 'text', 'tree', 'view' ],
      onModeChange: function () {
      setModes();
    }

  };
function setModes() {
    var m = editor.getMode();
    if ( m == 'code' ) {
      addInputIconstoEditor();
    }
    if ( m == 'text' ) {

      adjustInputIconstoEditor();
    }
  }

  editor = new JSONEditor( container, options );
  BuildEditor();

  $( '#validateJSON' ).click( function ( e ) {
    e.preventDefault();
    validateJSON();
  } )





  function BuildEditor() {
    addInputIconstoEditor();
  }
function adjustInputIconstoEditor() {
    var e = editor.menu;
    $( e ).append( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
      '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy" class="samplelink mx-1" onclick="getJsonSampleData();">Sample</a>' +


      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +

      '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +


      '</div>' ), $( e ).show();

  }
  function addInputIconstoEditor() {
    var e = editor.menu.getElementsByClassName( "jsoneditor-poweredBy" );
    $( e ).replaceWith( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
        '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy mx-1" class="samplelink" onclick="getJsonSampleData();">Sample</a>' +


        '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +

        '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
        '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o mx-1 icon-md"></div>' +


        '</div>' ), $( e ).show(),
      editor.focus()
  }




  if ( window.FileReader ) {

    if ( $( '#filesJs' ).length > 0 ) {
      document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'css' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                editor.set( contents );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
            }
            else {
              alert( 'File Type Not Supported' );
          }
        }
        return false;
      }
    }
  } else {
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );
    alert( 'file support not available' );

  }
}, resulteditor, editor );

function validateJSON() {
  if ( 0 == editor.getText().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;

  try {
    editor.get();
    editor.setText( "Valid JSON" );
    }
    catch ( e ) {
      editor.setMode( "text" );

  }
}
function copy_json() {
  let ClipBJS = new ClipboardJS( '#inputcopy', {
        text: function ( trigger ) {
      return editor.getText();
    },
  } );
  copyAlert( ClipBJS );
}
function getJsonSampleData() {
  var json = {
    "employees": {
      "employee": [ {
          "id": "1",
          "firstName": "Tom",
          "lastName": "Cruise",
          "photo": "https://pbs.twimg.com/profile_images/735509975649378305/B81JwLT7.jpg"
        },
        {
          "id": "2",
          "firstName": "Maria",
          "lastName": "Sharapova",
          "photo": "https://pbs.twimg.com/profile_images/3424509849/bfa1b9121afc39d1dcdb53cfc423bf12.jpeg"
        },
        {
          "id": "3",
          "firstName": "James",
          "lastName": "Bond",
          "photo": "https://pbs.twimg.com/profile_images/664886718559076352/M00cOLrh.jpg"
        }
      ]
    }
  };

  editor.set( json );
}
function cleanJSONEditor() {
  editor.setText( "" );
}

function loadJsData() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  var url = $( '#url' ).val();
  var btn = $( '#loadJsUrl' );

  var ajax_url = ajax_uri;
  if ( $.trim( url ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'link': url
      },
      beforeSend: function () {
          $( btn ).removeAttr( 'onclick' );
          $( btn ).html( '<span class="icon icon-cog icon-spin"></span> Loading ' );
          $( btn ).attr( 'disabled', true );
          $( btn ).addClass( 'btn-disabled' );
      },

      success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            var loadurl = $( '#url' ).val();
          var obj = '';
          try {
            obj = $.parseJSON( data );
            if ( "success" in obj ) {

              $( '#loadFromUrl' ).modal( "hide" );
              var e = obj.success;
              editor.set( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read Url' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsData()' );
            $( btn ).html( 'Load From Url' );
            }
            catch ( error ) {
              record_activity( 'tool_used', t_n, 'Error : Unable to decode response of url ' + loadurl );

          }
        }
      },
      complete: function ( xhr, textStatus ) {
          if ( '' != $.trim( xhr.status ) ) {
            record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
        }

      }
    } );
  }
}
