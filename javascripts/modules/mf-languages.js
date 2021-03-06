/*global document, window, mw, navigator, jQuery */
/*jslint sloppy: true, white:true, maxerr: 50, indent: 4, plusplus: true*/
(function( M,  $ ) {
M.languages = (function() {
	var createOverlay = M.navigation.createOverlay;

	function countAvailableLanguages() {
		return $( '#mw-mf-language-selection a' ).length;
	}

	function createLanguagePage() {
		var ul = $( '<ul />' )[0], li, a, $a, href, footer,
			$languages = $( '#mw-mf-language-selection a' );

		$( '<li />' ).addClass( 'mw-mf-overlay-header' ).
			text( $( '#mw-mf-language-section .content_block p' ).text() ).appendTo( ul );
		$languages.each( function(i, el) {
			li = $( '<li />' ).appendTo( ul )[0];
			a = $( '<a />' ).attr( 'href', $( el ).attr( 'href' ) ).text( $( el ).text() ).appendTo( li );
		} );
		footer = $( '<li />' ).addClass( 'mw-mf-overlay-footer' ).
			html( M.message( 'mobile-frontend-language-footer' ) ).appendTo( ul );
		$a = $( 'a', footer );
		href = $( '#mw-mf-universal-language' ).attr( 'href' )
		$a.attr( 'href', href );
		createOverlay( M.message( 'language-heading' ), ul, { hash: '#mw-mf-overlay-language' } );
	}

	function init() {
		var $a = $( '#mw-mf-language-section' );

		if( countAvailableLanguages() > 1 ) {
			$( '<button>' ).text( $a.find( 'h2' ).text() ).
				addClass( 'languageSelector' ).
					on( 'click', createLanguagePage ).insertBefore( $a );
		}
		$a.hide();
	}

	if( typeof $ !== 'undefined' ) {
		init();
		$( window ).bind( 'mw-mf-history-change', function( ev, curPage ) {
			if ( curPage.hash === '#mw-mf-overlay-language' ) {
				createLanguagePage();
			}
		} );
	}
	return {
		init: init
	};
}());
}( mw.mobileFrontend, jQuery ));
