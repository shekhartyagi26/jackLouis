let calc= function(num1,num2,calctype)
{
	if(calctype==="add")
	{
	return num1+num2;
	}
	else calctype==="mult"
	{
	return num1*num2;
	}
};
console.log(calc(2,3,'add'));
const arr=[10,20,30];
var first =  (array, n) => {
      if (array == null) 
      return void 0;
    if (n == null) 
      return array[0];
    if (n < 0)
      return [];
    return array.slice(0, n);
  };

console.log(first([7, 9, 0, -2]));

var last = function last(array, n) {
  if (array == null) return void 0;
  if (n == null) return array[array.length - 1];
  return array.slice(Math.max(array.length - n, 0));
};

console.log(last([7, 9, 0, -2]));
console.log(last([7, 9, 0, -2], 3));
console.log(last([7, 9, 0, -2], 6));
var arr1=[-3,8,7,6,5,-4,3,2,1];
var arr2=[];
var min=arr1[0];
var pos;
var max=arr1[0];
for (i=0; i<arr1.length; i++)
{
        if (max<arr1[i]) max=arr1[i];
}

for (var i=0;i<arr1.length;i++)
{
        for (var j=0;j<arr1.length;j++)
        {
                if (arr1[j]!="x")
                {
                        if (min>arr1[j]) 
                        {
                                min=arr1[j];
                                pos=j;
                        }
                }
        }
        arr2[i]=min;
        arr1[pos]="x";
        min=max;
}
console.log(arr2);
function printNames(...names) {
  console.log(`number of arguments: ${names.length}`);
  for (var name of names) {
    console.log(name);
  }
}

printNames('foo', 'bar', 'baz');