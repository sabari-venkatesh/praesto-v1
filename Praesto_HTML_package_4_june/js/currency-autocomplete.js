$(function(){
  var asin = [
    { value: 'B018E65WW2', data: 'THERMO PURE Natural Fat Burner Caffeine Free Weight Loss Pills and Healthy Appetite Suppressant Dietary Supplement, 60 Capsule' },
    { value: 'B01BON4QAQ', data: 'PAIN-MD, Top Pain Relief Supplement, Fast Acting Natural Formula for Joint Pain Relief and Muscle Discomfort, More Flexibility with Anti-Inflammatory' },
    { value: 'B01NBHK5XX', data: 'Install Centric ICGM12BNGM 2005-16 Class II Complete Installation Solution for Car Stereos' },
    { value: 'B01EXS1NA0', data: 'New Domaine Shredded Latex Cooling pillow- Queen' },
  ];
  
  // setup autocomplete function pulling from currencies[] array
  $('#myInput').autocomplete({
    lookup: asin,
    onSelect: function (suggestion) {
      //var thehtml = '<strong>Currency Name:</strong> ' + suggestion.value + ' <br> <strong>Symbol:</strong> ' + suggestion.data;
      $('#hiddenasin').val('');
      $('#hiddenasin').val(suggestion.value);
      $('#myInput').val(suggestion.data);
    }
  });
  

});